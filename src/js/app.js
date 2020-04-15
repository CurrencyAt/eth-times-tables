App = {
  web3Provider: null,
  contracts: {},

  init: async function()
  {
    $.getJSON('../numbers.json', function(data) {
      var numberRow = $('#numberRow');
      var numberTemplate = $('#numberTemplate');

      for (i = 0; i < data.length; i ++) {
        numberTemplate.find('.panel-title').text(data[i].name);
        numberTemplate.find('img').attr('src', data[i].picture);
        numberTemplate.find('.number-value').attr('data-value', data[i].value).text(data[i].value);
        numberTemplate.find('.btn-choose').attr('data-id', data[i].id);

        numberRow.append(numberTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
// Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
// If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('MathProblem.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var MathProblemArtifact = data;
      App.contracts.MathProblem = TruffleContract(MathProblemArtifact);
      // Set the provider for our contract
      App.contracts.MathProblem.setProvider(App.web3Provider);
      // Use our contract to retrieve and mark the solveed pets
      return App.markSolved();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-choose', App.handleSolve);
  },


  markSolved: function(mathProblems, account)
  {
    var AnswersInstance;
    App.contracts.MathProblem.deployed().then(function(instance)
    {
      AnswersInstance = instance;
      return AnswersInstance.getMathProblems.call();
    }).
    then(function(answeredQuestions)
    {
      for (i = 0; i < answeredQuestions[0].length; i++)
      {
        if (answeredQuestions[0][i] !== '0x0000000000000000000000000000000000000000')
        {
          var thisAnswer = web3.toDecimal(answeredQuestions[1][i]);
          var thisValue = web3.toDecimal(answeredQuestions[2][i]);
          if(thisAnswer === 1)
          {
            $('.panel-number').eq(i).find('button').text('Incorrect').attr('disabled', true);
          }
          else if(thisAnswer === 2)
          {
            $('.panel-number').eq(i).find('button').text('Correct').attr('disabled', true);
          }
          console.log(thisValue);
          $('.panel-number').eq(i).find('input').val(thisValue).attr('disabled', true);
        }
      }
    }).
    catch(function(err)
    {
      console.log('error:');
      console.log(err.message);
    });
  },

  handleSolve: function(event)
  {
    event.preventDefault();
    var numberId = parseInt($(event.target).data('id'));
    var inputVal = document.querySelectorAll('[data-value="'+numberId+'"]')[0].value;
    var MathProblemInstance;
    web3.eth.getAccounts(function(error, accounts)
    {
      if (error)
      {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.MathProblem.deployed().then(function(instance)
      {
        MathProblemInstance = instance;
       // var result = MathProblemInstance.solve.call(numberId, inputVal, {from: account});
        return  MathProblemInstance.solve(numberId, inputVal, {from: account});
      }).then(function()
      {
        return App.markSolved();
      })
      .catch(function(err)
      {
        console.log('error: ');
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function()
  {
    App.init();
  });
});
