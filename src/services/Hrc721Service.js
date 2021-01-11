import artifact from "./hrc721/artifact.json";
import { getHarmony } from "./AccountService";
import BigNumber from "bignumber.js";
export const oneToHexAddress = (address) =>
  getHarmony().crypto.getAddress(address).basicHex;

export const getContractInstance = (contractAddress) => {
  const hmy = getHarmony();
  const contract = hmy.contracts.createContract(artifact.abi, contractAddress);
  return contract;
};

export async function getTokenBalance(address, contractAddress) {
  const instance = getContractInstance(contractAddress);
  const hexAddress = oneToHexAddress(address);
  let balance = await instance.methods.balanceOf(hexAddress).call();
  return new BigNumber(balance).toNumber();
}

export async function getTokenURI(tokenid, contractAddress) {
  const instance = getContractInstance(contractAddress);
  let uri = await instance.methods.tokenURI(tokenid).call();
  return uri;
}

export async function getTokenOfOwnerByIndex(address, index, contractAddress) {
  const instance = getContractInstance(contractAddress);
  const hexAddress = oneToHexAddress(address);
  let id = await instance.methods.tokenOfOwnerByIndex(hexAddress, index).call();
  return new BigNumber(id).toString();
}

export async function getTotalSupply(contractAddress) {
  const instance = getContractInstance(contractAddress);
  let supply = await instance.methods.totalSupply().call();
  return new BigNumber(supply).toNumber();
}

export async function getContractName(contractAddress) {
  const instance = getContractInstance(contractAddress);
  let name = await instance.methods.name().call();
  console.log(name);
  return name;
}
