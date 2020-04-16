# eth-times-tables
Multiplication tables test example using Ethereum.

A very simple Ethereum Solidity and node.js/truffle/web3 program I wrote to begin learning to develop smart contracts.  Please do not take anything in this program as a best practice.  This is based on the Truffle "pet shop tutorial" found at https://www.trufflesuite.com/tutorials/pet-shop  Set up of Truffle and Ganache would be similar to the instructions there.

The parts of the program are an Ethereum personal blockchain for testing (Ganache), a Truffle application for creating and compiling smart contracts, and a node.js/web3.js web application for creating an interface, and a web browser equipped with metamask or a similar Ethereum wallet solution.

A more complete solution would be to award tokens based on correct answers, rather than just charging the user fake Ethereum to answer the question!

Flow:

The User is presented with questions established in the web application, with answers hidden in a private array in the MathProblem.sol contract.

![screen1](/readmefiles/1.png)

![screen1](/readmefiles/2.png)

![screen1](/readmefiles/5.png)

Once the user submits an answer, Metamask or other wallet should be engaged.

![screen1](/readmefiles/3.png)


The user's answer is contained in the transaction, and will only return an address.  So, we need to .call the getMathProblems function exposed in the contract interface.

This will return 3 arrays (we could have used a Structure), which we can then parse in Javascript. Note that we need to be sure to use the .toDecimal function from web3 to parse the users answer, and whether it was correct.

![screen1](/readmefiles/6.png)

![screen1](/readmefiles/7.png)

As shown in the pet shop tutorial, we iterate through all of the questions and mark whether they have been answered, and whether they are correct, as well disabling input and buttons from answered querstions.  This certainly isn't the most efficient way to do things, but it let's us reuse the same function when the page initially loads and retrieves the existing state of the blockchain. 

![screen1](/readmefiles/4.png)












