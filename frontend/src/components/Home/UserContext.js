import React from "react";

// set the defaults
const UserContext = React.createContext({
    user: null,
    setUser: () => {},
    provider: null,
    setProvider: () => {},
    reload: false,
    setReload: () => {}
});

export default UserContext;
