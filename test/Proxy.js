const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  async function deployFixture() {

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Impl1 = await ethers.getContractFactory("implementation1");
    const impl1 = await Impl1.deploy();

    const Impl2 = await ethers.getContractFactory("implementation2");
    const impl2 = await Impl2.deploy();

    const proxyImpl1 = await ethers.getContractAt("implementation1", proxy.address);
    const proxyImpl2 = await ethers.getContractAt("implementation2", proxy.address);

    return { proxy, impl1, proxyImpl1, impl2, proxyImpl2 };
  }

  describe("Deployment", function () {
    it("Should set correct x", async function () {
      const { proxy, impl1, impl2, proxyImpl1, proxyImpl2 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(impl1.address);
      
      await proxyImpl1.changeX(10);
      
      await proxy.changeImplementation(impl2.address);

      await proxyImpl2.changeY(9);

      console.log(Number(await ethers.provider.getStorageAt(impl1.address, "0x0")));
      console.log(Number(await ethers.provider.getStorageAt(impl2.address, "0x0")));

      expect(parseInt(await ethers.provider.getStorageAt(proxy.address, "0x0"))).to.equal(9);
    });
  });
});
