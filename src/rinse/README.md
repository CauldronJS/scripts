# Rinse

> A JSX library for Cauldron

Ok I understand how crazy this sounds. We aren't rendering HTML, we aren't processing SSR templates, so why use JSX? 

## Its Use As A State Machine

With React, state machines got a huge promotion through technologies like Redux. With that, we can easily organize our state machines in a way that looks clean and performs as expected. Cauldron can take advantage of this in a similar way, facilitating for full-blown plugins in JS to more easily organized.

## An Example By Comparison

In basic logic, it's not that useful. You can do what you usually do and make factories, services, managers, etc. But there's one use that it could become especially powerful in: User Interaction. Putting logic aside, we could for example make a UI system with inventories look like such:

```
import Rinse, {useState} from 'rinse';

const UIElement = ({onClick}) => (
  // handle onClick of the inventory item
);

const UIMenu = ({player, children}) => {
  // show the inventory menu
  return (
    <>
      {children.map(child => (
        <UIElement onClick={this.myOnClickFunction} />
      ))}
    </>
  )
}

const UIApp = Rinse.mount(<UIMenu player={somePlayer} />);
```
