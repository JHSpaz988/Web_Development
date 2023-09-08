var numberOfBottles = 99;

while (numberOfBottles >= 0) {
  let bottlePlurality = "bottles";

  while (numberOfBottles >= 0) {
    console.log(
      numberOfBottles + " " + bottlePlurality + " of beer on the wall,",
    );
    console.log(numberOfBottles + " " + bottlePlurality + " of beer,");
    console.log("Take one down pass it around,");

    numberOfBottles--;
    if (numberOfBottles === 0) {
      bottlePlurality = "bottles";
      numberOfBottles = "No more";
    } else if (numberOfBottles === 1) {
      bottlePlurality = "bottle";
    } else {
      bottlePlurality = "bottles";
    }

    console.log(
      numberOfBottles + " " + bottlePlurality + " of beer on the wall.\n",
    );
  }
}
