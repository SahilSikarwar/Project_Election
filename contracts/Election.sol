pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    // Store Voters that have voted
    mapping(address => bool) public voters;
    // Store a Candidate
    mapping(uint256 => Candidate) public candidates;
    // Store Candidates count
    uint256 public candidatesCount;
    // Constructor
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
    // function to fetch candidates frim the mapping
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    function vote(uint256 _candidateId) public {
        // Require that they haven't voted yet
        require(!voters[msg.sender], "You have already voted");
        // Requre a valid candidate
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Not a valid candidate"
        );
        // Store the voters in the mapping
        voters[msg.sender] = true;

        // Increase the voteCount of the candidate
        candidates[_candidateId].voteCount++;
    }
}
