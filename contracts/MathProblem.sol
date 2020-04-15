pragma solidity ^0.5.0;

contract MathProblem
{
    address[5] public numberIds;
    uint[5] private products = [4,12,36,72,50];
    uint[5] public results = [0,0,0,0,0];
    uint[5] public values;


    function solve(uint id, uint value) public returns (uint)
    {
        require(id >= 0 && id <= 4);
        numberIds[id] = msg.sender;
        values[id] = value;

        if(value == products[id])
        {
            results[id] = 2;
        }
        else
        {
            results[id] = 1;
        }
        return id;
    }

    function getResult(uint index) view public returns (uint)
    {
        return (results[index]);  // 0 == not answered, 1 == wrong, 2 == correct
    }


    function getMathProblems() view public returns (address[5] memory, uint[5] memory, uint[5] memory)
    {
        return (numberIds, results, values);
    }
}