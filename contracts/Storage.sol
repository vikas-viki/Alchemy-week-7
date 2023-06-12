// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Storage {
    uint public number = 99;
    uint private number1 = 110;
    mapping (uint => string ) public privatebalance;
    constructor(){
        privatebalance[12] = "private key 1";
        privatebalance[23] = "private key 2";
    }
}