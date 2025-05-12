import React, { useRef } from 'react';
import { AarcProvider } from './context/AarcProvider';
import ThirdWebApp from './components/ThirdWebApp';
import "@aarc-xyz/eth-connector/styles.css"
import './index.css';
import { AarcFundKitModal } from '@aarc-xyz/fundkit-web-sdk';
import { aarcConfig } from './config/aarcConfig';
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

const App = () => {
  const aarcModalRef = useRef(new AarcFundKitModal(aarcConfig));
  const aarcModal = aarcModalRef.current;

  const thirdWebClient = createThirdwebClient({
    clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
  });


  return (
    <React.StrictMode>
      <ThirdwebProvider>
        <AarcProvider aarcModal={aarcModal}>
          <ThirdWebApp
            isDark={true}
            logoLight="/logo.svg"
            logoDark="/logo.svg"
            aarcModal={aarcModal}
            thirdWebClient={thirdWebClient}
            onThemeToggle={() => {}}
          />
        </AarcProvider>
      </ThirdwebProvider>
    </React.StrictMode>
  );
};

export default App;