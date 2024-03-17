<script lang="ts">
  import { ethers } from "ethers";
  import type { JsonRpcSigner } from "ethers";
  import { Contract } from "ethers";
  import { ABI } from "./abi";

  let acct: any;
  let a: number;
  let c: number;

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const account = await provider.send("eth_accounts", []);
    acct = account;
    console.log(account);
  };

  const mint = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = await initializeContract(signer);
    await contract.mint(a);
  };  


  const stake = async () => {
    if (c > 0){
    try{
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = await initializeContract(signer);
    await contract.stake(c);}

    catch (error) {
      alert("You have not enough steaks to stake. Try getting some steaks first!")
    }}
    else {alert("You cannot stake 0 steaks!")}
  };  

  const withdraw = async () => {
    try{
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = await initializeContract(signer);
    await contract.withdraw();
    }
    catch (error) {
      alert("You did not stake steaks yet. Please stake some steaks!")
    }
  };  

  const initializeContract = async (signer: JsonRpcSigner) => {
    return new Contract(
      "0x5D85422595D785D0a3CbE586179730057C59d00d",
      ABI,
      signer
    );
  };



</script>

<main>
    <h1> Steak Shop </h1>
    <p> with a chance of gravy! </p>
    <button on:click={connectWallet}>Connect Wallet</button>
    <br>
    <button>{acct}</button>
    <br><br>
    <input type="number" bind:value={a}/> <br>
    <button on:click={mint}> I Want Steaks </button>
    <br><br>
    <input type="number" bind:value={c}/> <br>
    <button on:click={stake}> Stake Steaks </button> <br>
    <p> Kindly wait for 10 seconds to get your staked steaks back </p>
    <button on:click={withdraw}> I Want My Steaks Back With Some Gravy</button>

</main>