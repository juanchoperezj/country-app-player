import { gql } from '@apollo/client';

export interface Continent {
  name: string;
}

export const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      name
    }
  }
`;
