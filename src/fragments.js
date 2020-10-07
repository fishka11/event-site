/* eslint-disable import/prefer-default-export */
import { graphql } from 'gatsby';

export const query = graphql`
  fragment EventInformation on GraphCMS_Event {
    eventName
    eventFullName
    eventType
    eventStartDate
    eventEndDate
    singleRoomPrice
    doubleRoomPrice
    cite
    citeAuthor
  }

  fragment EventLocation on GraphCMS_Event {
    eventLocation {
      name
      address
      postalCode
      city
      webSite
      googleMapsCode
    }
  }

  fragment EventOrganizers on GraphCMS_Event {
    organizers {
      id
      name
      shortName
      organizerType
      logo {
        url
      }
      webSite
      eMail
      address
      postalCode
      city
      phone
      fax
      bankName
      bankAccount
      nip
      regon
    }
  }

  fragment EventBrandLogo on GraphCMS_Event {
    brand {
      url
      height
      width
    }
  }

  fragment EventPictureStrap on GraphCMS_Event {
    picturesStrap {
      url
    }
  }

  fragment EventMenuItems on GraphCMS_Event {
    eventSiteMenu(orderBy: itemOrder_ASC) {
      displayName
      id
      visibleInMenu
      itemOrder
      path
      button
      description
      title
    }
  }
`;
