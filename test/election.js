var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
  var elecInstance;
  it("initialize with 2 candidates", function() {
    return Election.deployed()
      .then(instance => {
        return instance.candidatesCount();
      })
      .then(count => {
        assert.equal(count, 2);
      });
  });

  it("initialize candidate with the correct values", () => {
    return Election.deployed().then(instance => {
      elecInstance = instance;
      return elecInstance
        .candidates(1)
        .then(candidate => {
          assert.equal(candidate[0], 1, "contain the correct id");
          assert.equal(
            candidate[1],
            "Candidate 1",
            "contain the correct candidate name"
          );
          assert.equal(candidate[2], 0, "contain the correct voteCount");
          return elecInstance.candidates(2);
        })
        .then(candidate => {
          assert.equal(candidate[0], 2, "contain the correct id");
          assert.equal(
            candidate[1],
            "Candidate 2",
            "contain the correct candidate name"
          );
          assert.equal(candidate[2], 0, "contain the correct voteCount");
        });
    });
  });

  it("Allow voters to cast votes", () => {
    return Election.deployed()
      .then(instance => {
        elecInstance = instance;
        candidateId = 1;
        return elecInstance.vote(candidateId, { from: accounts[0] });
      })
      .then(receipt => {
        return elecInstance.voters(accounts[0]);
      })
      .then(voted => {
        assert(voted, "The voter was marked as voted");
        return elecInstance.candidates(candidateId);
      })
      .then(candidate => {
        var voteCount = candidate[2];
        assert.equal(voteCount, 1, "increments the candidate's vote count");
      });
  });
});
