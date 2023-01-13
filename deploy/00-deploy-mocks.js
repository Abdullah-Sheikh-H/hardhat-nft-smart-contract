const { getNamedAccounts, deployments, network, ethers } = require("hardhat")

const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9
const DECIMALS = "18"
const INTIAL_PRICE = ethers.utils.parseUnits("2000", "ether")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { log, deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying Mock")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })

        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INTIAL_PRICE],
        })
        log("Mock Deployed")
        log("------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
