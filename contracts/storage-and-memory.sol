pragma solidity ^0.8.15;

// THIS IS JUST AN EXAMPLE TO DEPICT HOW STORAGE AND MEMORY ARE USED.
contract StorageAndMemory {
  int[] public numbers;

  function Numbers() public {
    numbers.push(20);
    numbers.push(32);
    // at this point the numbers array is:
    // [20, 32]

    // storing the variable this way points myArray and numbers at the exact same array in storage.
    // int[] storage myArray = numbers;
    // myArray[0] = 1; // set the first element = 1 in myArray.
    // [1, 32]

    // now myArray points towards a copy of int[] stored in memory.
    // int[] memory myArray = numbers;
    // myArray[0] = 1;
    // now, getting the output of NUMBERS returns the original array [20,32]
    // getting the output of MYARRAY outputs [1,32]
    //________________________________//

    changeArray(numbers);
  }

  // by default, similar to memory, myArray is a copy of the numbers array given it takes the numbers array as an arg from above.
  // basically, int[] memory is the default.
  function changeArray(int[] storage myArray) private {
    myArray[0] = 1;
  }
}