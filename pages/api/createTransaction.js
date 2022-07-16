import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import products from "./products.json";

const sellerAddress = 'Cg7BVq43s2SBRceLtfuj5RFd9wrNVHCFvdjPhStCTsBR';
const sellerPublicKey = new PublicKey(sellerAddress);

const createTransaction = async(req, res) => {
    try {
        // Extract transaction info from request body
        const { buyer, orderID, itemID } = req.body;

        // if we dont have something we need, stop
        if (!buyer) {
            return res.status(400).json({
                message: "Missing buyer address",
            });
        }
        if (!orderID) {
            return res.status(400).json({
                message: "OrderID missing",
            });
        }
        // Fetch item price from products.json using itemID
        const itemPrice = products.find((item) => item.id === item.id).price;

        if (!itemPrice) {
            return res.status(400).json({
                message: "Item not found. Please check ID",
            });
        }

        // Convert our price to correct format
        const bigAmount = BigNumber(itemPrice);
        const buyerPublicKey = new PublicKey(buyer);
        const network = WalletAdapterNetwork.Devnet;
        const endpoint = clusterApiUrl(network);
        const connection = new Connection(endpoint);

        // Blockhash. Like an ID for block. Lets us identify the block
        const { blockhash } = await connection.getLatestBlockhash("finalized");

        // The first two things we need - a recent block ID
        // and the public key of fee payer
        const tx = new Transaction({
            recentBlockhash: blockhash,
            feePayer: buyerPublicKey,
            blockhash: blockhash,
        });

        // This is the first "action" that the transaction will take
        // We are just going to transfer some SOL
        const transferInstruction = SystemProgram.transfer({
            fromPubkey: buyerPublicKey,
            lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
            toPubkey: sellerPublicKey,
        });

        // we are adding more instructions to the tx
        transferInstruction.keys.push({
            // we will use our OrderID to find this tx later
            pubkey: new PublicKey(orderID),
            isSigner: false,
            isWritable: false,
        });
        tx.add(transferInstruction);

        // formatting our tx
        const serializedInstruction = tx.serialize({
            requireAllSignatures: false,
        });
        const base64 = serializedInstruction.toString("base64");

        res.status(200).json({
            transaction: base64
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({ error: "error creating tx" });
        return;
    }
}

export default function handler(req, res) {
    if (req.method == "POST") {
        createTransaction(req, res);
    }
    else {
        res.status(405).end();
    }
}