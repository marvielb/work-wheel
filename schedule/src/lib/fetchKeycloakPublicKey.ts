import { JWK } from 'jose';

const fetchKeyclockPublicKey = async () => {
  const jwksUrl = `${Bun.env.KEYCLOAK_REALM_URL}/protocol/openid-connect/certs`;
  const response = await fetch(jwksUrl);
  const jwks = await response.json();
  const publicKey = jwks.keys[0];

  return publicKey as JWK;
};

export default fetchKeyclockPublicKey;
