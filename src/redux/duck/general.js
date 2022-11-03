import { createSlice } from '@reduxjs/toolkit'

// Action Creator
export const setGeneral = (obj) => dispatch => {
  try {
    return dispatch(setGeneralAction(obj));
  } catch (e) {
    return console.error(e.message);
  }
}

// Slice
const generalDuck = createSlice(
  {
    name: 'generalDuck',
    initialState: {
      websiteName: 'Panda',
      logo:'nomeImmagine',   //nome immagine da abbinare a path predefinito
      palette:
      [
        {
          name:'primary',
          bgColor:'#262E36',
          textColor:'#fff'
        },
        {
          name:'secondary',
          bgColor:'#B12009',
          textColor:'#000'
        },
        {
          name: 'tertiary',
          bgColor:'#CFC36F',
          textColor:'#000'
        }
      ],
      contacts: {
        phone: 3395039550,
        email:'panda@gmail.com',
        address: "Via Ticino 7, Milano",
        PIva: "0000000034345345345",
        CF: "1111111134345345345",
      },
      sectionWork:{
        text: "Lorem esgrasegareg",
        email: "panda.info@gmail.com"
      },
      banner:{
        title: "Titolo del banner",
        subtitle: "Sottotitolo del banner",
        btnText1: "testo1",
        btnText2: "testo2",
        link: "panda.com"
      },
      social: []
    },
    reducers: {
      setGeneralAction: (state, action) => {
        state.websiteName = action.payload.websiteName;
        state.logo = action.payload.logo;
        state.pallette = action.payload.pallette;
        state.contacts = action.payload.contacts;
        state.sectionWork = action.payload.sectionWork;
        state.banner = action.payload.banner;
        state.social = action.payload.social
      }
    }
  }
);

export default generalDuck.reducer

// Actions
const {
  setGeneralAction
} = generalDuck.actions