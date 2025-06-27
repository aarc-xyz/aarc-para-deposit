import React, { useRef } from 'react';
import { AarcProvider } from './context/AarcProvider';
import ParaDepositModal from './components/ParaDepositModal';
import "@aarc-xyz/eth-connector/styles.css"
import './index.css';
import { AarcFundKitModal } from '@aarc-xyz/fundkit-web-sdk';
import { aarcConfig } from './config/aarcConfig';

const App = () => {
  const aarcModalRef = useRef(new AarcFundKitModal(aarcConfig));
  const aarcModal = aarcModalRef.current;

  return (
    <React.StrictMode>
        <AarcProvider aarcModal={aarcModal}>
          <ParaDepositModal
            isDark={true}
            logoLight="/logo.svg"
            logoDark="/logo.svg"
            aarcModal={aarcModal}
            onThemeToggle={() => {}}
          />
        </AarcProvider>
    </React.StrictMode>
  );
};

export default App;