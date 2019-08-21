# **ROGUELIKE GAME**

## **Game structure**

### **Player**

TODO: describe **Player**

***

### **Enemies**

TODO: describe enemies

***

### **Board**

This is a game field, contains only cells in matrix with coords [x][y]. Started from upper left point as [0][0]. Each cell contains some *Location* (also *Location* is parent class for all other locations).

**Location** types:

1. '0' - **Floor**. Simple opened location.
2. '1' - **Wall**. Simple closed location. Have **isBlocked** = **false** as default value.
3. 'F' - **Finish**. Type of **Floor**. Acessable to all objects to move. If **Player** will step here, then game will be finished.
4. 'H' - **Heal Fountain**. Type of **Floor**. Acessable to all objects to move. If **Player** will step here, then his **HP** will be raised to 1 (until maximum of course).
5. 'X' - **Trap**. Type of **Floor**. Acessable to all objects to move. If **Player** will step here, then he will lose 1 **HP**.
6. 'T**i**' - **Teleport**. Type of **Floor**. **i** - **ID** of **Teleport**. Acessable to all objects to move. If **Player** will step here, then he teleport to another **Teleport** with same **ID**. Example - T1, TA.

***