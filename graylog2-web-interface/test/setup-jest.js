/// <reference types="jest-enzyme" />

import sizeMe from 'react-sizeme';

import registerBuiltinStores from 'injection/registerBuiltinStores';

sizeMe.noPlaceholders = true;

registerBuiltinStores();
