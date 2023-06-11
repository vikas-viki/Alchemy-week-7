// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./StorageSlot.sol";

/*
    Here what it does is, when you change the implementation(address) 
    it just takes the implementation process like, it just fallbacks it to the 
    implementation contract as the function does not exists in contract and it takes it's
    process like "x = _x" but here the cache is it sotres the value in its(Proxy's) storage at the implmented 
    contract storage slot of that variable, like if in implemented contract, a variable x is in storage slot 0x0, the
    proxy contract will allocate it's 0x0 storage to store that value x.

    If you implement another contract you should append the variables and should not modify the order, like if in the first
    implementation there is a variable x and in second implementation there the first variable should be x and then you can append 
    your required variable down to it, if not when you try to upgrade value of second implementations of a variable let say Y,
    it will change the 0x0 storage of Proxy contract as it stores the value in storage slot of the implemented contract variable's
    storage slot.

    refer:- https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#proxy-forwarding for more...
*/

contract Proxy {
    function changeImplementation(address _implementation) external {
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot
            .getAddressSlot(keccak256("impl"))
            .value
            .delegatecall(msg.data);
        require(success);
    }
}

contract implementation1 {
    uint x;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract implementation2 {
    uint y;

    function changeY(uint _y) external {
        y = _y;
    }
}