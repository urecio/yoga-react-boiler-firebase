import styled from 'styled-components';

import { custom } from 'assets/styles/theme';

export default {
  components: {
    DashboardGrid: styled.article`
      .card.wide > div {
        box-shadow: none;
        ${custom.rainbowBorder}
      }
    `,
  },
  inline: {
    cardContent: {
      width: '75%',
      height: '85vh',
      position: 'relative',
      zIndex: 1150,
      boxShadow: 'none',
      top: '-50px',
      margin: 'auto',
    },
  },
};
