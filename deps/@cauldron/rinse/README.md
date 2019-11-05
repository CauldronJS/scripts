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

## VDOM In Minecraft

The concept sounds far-fetched, but hear me out. When we're interacting with player lifecycles, there's only ever one view state for the user. They're either playing, in an inventory, typing, or paused. That's it. That means we can break the UX into 4 different groups of consumption:

1. standard gameplay where UI updates aren't caused by the player
2. inventories which are treated as a grid where UI will update reactively
3. a text box where UI is treated as flow and will update reactively _with the right handling_
4. no UI updates at all

What this shows is that in 50% of the player's cases, they are simply **reading** from the state, not writing. While we aren't directly interacting with any DOM, we _are_ creating UI elements from basic button-like components in the UX. Since all inventory updates are batched, we can think of both the inventory and the chat box as a single DOM host. We could even take it one step further and implement both the menu and the chatbox as members of the same DOM even though they're static in nature (we don't have the possibility yet to change the position or shape of either elements).

## TODO

* Remove capability for class components. I'd like this to solely take on the methodology of "function components only"
* Create a consumer for async methods and proper lifecycle handling
* Proper VDOM management
