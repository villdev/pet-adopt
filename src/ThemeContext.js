import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]);
//we can stick in anything inside context, here we are sticking in a hook (hook like shape [state, updater])
//it can also be an object, function, string, number

//given empty function -> just a placeholder, so will use this particular function if it has no provider but this should never happen

export default ThemeContext;
