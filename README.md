# myCryptoPortfolio

This project goal is to deliver an open source tool to track your crypto portfolio. The data is stored encrypted in a central database so multiple users can view and collaborate on real time, in a google docs-ish fashion. The server is not aware of what information holds and does not perform computations since the data is only decrypted and manipulated at the client.

The data input should include
- different blockchain accounts
- read-only credentials of exchanges
- target portfolio percentages

# Challenges
- The Bittrex API is not CORS allowed, so browsers can not consume private endpoints easily

# Todo
- [x] Server <-> Client communications
- [ ] Data input
- [ ] Data visualization
