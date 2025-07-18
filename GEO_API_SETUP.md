# GeoDB Cities API Setup Guide

This guide explains how to set up the GeoDB Cities API integration for the location dropdown feature.

## 1. Get RapidAPI Key

1. Go to [RapidAPI GeoDB Cities](https://rapidapi.com/wirefreetech/api/geodb-cities/)
2. Sign up for a free account on RapidAPI
3. Subscribe to the GeoDB Cities API (free tier available)
4. Copy your API key from the RapidAPI dashboard

## 2. Configure Environment Variables

Create a `.env` file in the root directory of your project:

```env
REACT_APP_GEO_API_KEY=your_rapidapi_key_here
```

Replace `your_rapidapi_key_here` with your actual RapidAPI key.

## 3. API Features

The integration includes the following features:

- **City Search**: Search cities by name with autocomplete
- **Popular Cities**: Display popular cities when dropdown is opened
- **City Details**: Shows city name, region, country, and population
- **Debounced Search**: Prevents excessive API calls while typing
- **Loading States**: Visual feedback during API requests

## 4. Usage

The LocationDropdown component is now integrated into the EditProfileModal. Users can:

1. Click on the location field
2. See popular cities automatically
3. Type to search for specific cities
4. Select a city from the dropdown

## 5. API Limits

The free tier of GeoDB Cities API includes:
- 10,000 requests per month
- Rate limiting: 1 request per second
- Basic city data (name, country, region, population)

## 6. Error Handling

The integration includes error handling for:
- Network errors
- API rate limiting
- Invalid API keys
- Empty search results

## 7. Customization

You can customize the behavior by modifying:
- `src/services/geoService.js` - API calls and data formatting
- `src/components/LocationDropdown.js` - UI and interaction logic
- `src/config/apiKeys.js` - API key configuration

## 8. Troubleshooting

If the location dropdown is not working:

1. Check that your API key is correctly set in `.env`
2. Verify your RapidAPI subscription is active
3. Check browser console for error messages
4. Ensure you're not exceeding API rate limits

## 9. Alternative Setup

If you prefer to hardcode the API key (not recommended for production):

1. Edit `src/config/apiKeys.js`
2. Replace `process.env.REACT_APP_GEO_API_KEY` with your actual key
3. Remove the `.env` file setup

**Note**: Never commit API keys to version control. Always use environment variables for production applications. 