describe('netflix-ui: NetflixUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=netflixui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to NetflixUi!');
    });
});
