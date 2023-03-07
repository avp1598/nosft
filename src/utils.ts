import { Utxo } from "./types";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const ordinalsUrl = (utxo: Utxo) => {
  return `https://ordinals.com/output/${utxo.txid}:${utxo.vout}`;
};

export const ordinalsImageUrl = (utxo: Utxo) => {
  return `https://ordinals.com/content/${utxo.txid}i${utxo.vout}`;
};

export const cloudfrontUrl = (utxo: Utxo) => {
  return `https://d2v3k2do8kym1f.cloudfront.net/minted-items/${utxo.txid}:${utxo.vout}`;
};

export const shortenStr = (str: string) => {
  if (!str) return "";
  return (
    str.substring(0, 8) + "..." + str.substring(str.length - 8, str.length)
  );
};

export const copy = (text: string) => {
  navigator.clipboard.writeText(
    text
  );
}

export const toXOnly = (key: Buffer) => {
  return key.length === 33 ? key.slice(1, 33) : key;
}


export const connectWallet = async () => {
  if (window.nostr && window.nostr.enable) {
    await window.nostr.enable();
  } else {
    alert(
      "Oops, it looks like you haven't set up your Nostr key yet. Go to your Alby Account Settings and create or import a Nostr key."
    );
    return;
  }
  return await window.nostr.getPublicKey();
};
