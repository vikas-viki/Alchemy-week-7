const hre = require("hardhat");
const { keccak256, hexZeroPad } = hre.ethers.utils;

async function main() {
    // For public variables.
    const publicVar = await hre.ethers.provider.getStorageAt("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", "0x0");
    console.log(Number(publicVar));

    // For private variables.
    const privateVar = await hre.ethers.provider.getStorageAt("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", "0x1");
    console.log(Number(privateVar));

    // for mapping.
    const key = hexZeroPad(12, 32);
    const base = hexZeroPad(0x2, 32).slice(2);
    const storageSlot = keccak256(key + base);
    const data = await hre.ethers.provider.getStorageAt("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", storageSlot);

    console.log(data);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512