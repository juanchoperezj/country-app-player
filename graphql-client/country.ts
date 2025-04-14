import { gql } from '@apollo/client';

export interface Country {
  capital: string;
  currency: string;
  name: string;
  code: string;
  continent: {
    name: string;
  };
  emoji: string;
}

export interface Currency {
  currency: string;
}

export const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      name
      capital
      currency
      code
      continent {
        name
      }
      emoji
    }
  }
`;

export const GET_CURRENCIES_PER_COUNTRY = gql`
  query getCurrenciesPerCountry {
    countries {
      currency
    }
  }
`;
