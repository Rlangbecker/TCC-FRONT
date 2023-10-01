import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <div>
        <ReactLoading type='spin' color='white' height={300} width={225} />
        <p>Aguarde um instante...</p>
    </div>
);

export default Loading;