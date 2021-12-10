const ABI = [{
    inputs: [{
      internalType: "address",
      name: "",
      type: "address"
    }],
    name: "balances",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "bool",
        name: "calcTown",
        type: "bool"
      }
    ],
    name: "getHeroesByOwner",
    outputs: [{
      components: [{
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "heroType",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "xp",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "attack",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "armor",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "speed",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "hp",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "arrivalTime",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "level",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "heroClass",
          type: "uint256"
        }
      ],
      internalType: "struct HeroLibrary.Hero[]",
      name: "",
      type: "tuple[]"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{
        internalType: "uint256",
        name: "_attackingHero",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "enemyType",
        type: "uint256"
      }
    ],
    name: "fight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
      internalType: "address",
      name: "",
      type: "address"
    }],
    name: "unLockTime",
    outputs: [{
      internalType: "uint256",
      name: "",
      type: "uint256"
    }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{
      internalType: "uint256",
      name: "_heroId",
      type: "uint256"
    }],
    name: "unLockLevel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
];

export default ABI;