// This is the main file that exports all functions for deployment
import * as onUserCreateTrigger from './triggers/onUserCreate';
// import * as webhookStripeApi from './api/webhookStripe';

// Export functions so Firebase CLI can find and deploy them
export const newUserSetup = onUserCreateTrigger.onUserCreate;
// export const stripeWebhook = webhookStripeApi.stripeWebhook; 

// You would typically initialize Admin SDK here too
// admin.initializeApp();