import React, {JSX} from 'react';

const InputGroup = ({children}: { children: JSX.Element | Array<JSX.Element> }) => {
  return (
    <div className={`my-3 flex flex-col gap-1`}>
      {children}
    </div>
  );
};

export default InputGroup;