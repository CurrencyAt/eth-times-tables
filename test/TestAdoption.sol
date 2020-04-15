pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MathProblem.sol";

contract TestMathProblem {
    // The address of the MathProblem contract to be tested
    MathProblem mathProblem = MathProblem(DeployedAddresses.MathProblem());

    uint expectedNumberId = 0;

    address expectedSolver = address(this);

    function testUserCanSolve() public
    {
        uint returnedId = mathProblem.solve(expectedNumberId, 0);
        Assert.equal(returnedId, expectedNumberId, "MathProblem of the expected pet should match what is returned.");
    }

    function testGetSolverAddressId() public
    {
        address solver = mathProblem.numberIds(expectedNumberId);
        Assert.equal(solver, expectedSolver, "Owner of the expected pet should be this contract");
    }

    function testGetSolverAddressArray() public
    {
        // Store mathProblems in memory rather than contract's storage
        address[5] memory mathProblems = mathProblem.getMathProblems();
        Assert.equal(mathProblems[expectedNumberId], expectedSolver, "Owner of the expected pet should be this contract");
    }

    function testAnswer() public
    {
        mathProblem.solve(0,4);
        uint answer = mathProblem.getResult(0);
        Assert.equal(answer, 7, "Answer should be 4");
    }
}