import React, { useEffect, useState } from "react";
import Home from './components/Home'
export default function App() {
  const creatorAccount = {
    address: "0x0022d07d887435CC481f8dc22c3373b3265e48bA",
    name: "Nishay madhani",
    domain: "nshmadhani.crypto"
  }
  return (
    <Home creatorAccount={creatorAccount}></Home>
  );
}
