// import React, { useState, useEffect, useContext } from "react";
import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import { connect } from "react-redux";
import Results from "./Results";
import useDropdown from "./useDropdown";
import changeTheme from "./actionCreators/changeTheme";
import changeLocation from "./actionCreators/changeLocation";
// import ThemeContext from "./ThemeContext"; using redux now

// const SearchParams = () => {
const SearchParams = (props) => {
  // const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animals", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  // const [theme, setTheme] = useContext(ThemeContext); using redux now

  async function requestPets() {
    const { animals } = await pet.animals({
      // location,
      location: props.location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            // value={location}
            value={props.location}
            placeholder="Location"
            // onChange={(e) => setLocation(e.target.value)}
            onChange={(e) => props.updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            // value={theme}
            value={props.theme}
            // onChange={(e) => setTheme(e.target.value)}
            // onBlur={(e) => setTheme(e.target.value)}
            onChange={(e) => props.setTheme(e.target.value)}
            onBlur={(e) => props.setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        {/* <button style={{ backgroundColor: theme }}>Submit</button> */}
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

//pull things out of Redux and hand it to the component
const mapStateToProps = ({ theme, location }) => ({
  theme,
  location,
});
//above is reading data

//below is updating data -> send actions to Redux to tell it update itself.
const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(changeTheme(theme)),
  updateLocation: (location) => dispatch(changeLocation(location)),
});
//take in theme and call dispatch and call changeTheme

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
//connect reutrns a function which we invoke on SearchParams
