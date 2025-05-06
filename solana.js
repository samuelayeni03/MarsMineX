const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

async function connectWallet() {
  try {
    if (!window.solana || !window.solana.isPhantom) {
      alert("Phantom wallet not found. Please install it.");
      return;
    }

    const resp = await window.solana.connect();
    const pubKey = resp.publicKey.toString();
    console.log("Connected wallet:", pubKey);
    walletAddress.textContent = `Connected: ${pubKey}`;
  } catch (err) {
    console.error("Wallet connection failed:", err);
    walletAddress.textContent = "Connection failed.";
  }
}

connectBtn.addEventListener("click", connectWallet);
