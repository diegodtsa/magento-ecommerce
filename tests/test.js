const {Builder, By} = require("selenium-webdriver");
const assert = require("chai").assert

describe('Login Tests', async function(){

    let driver;

    beforeEach(async function(){
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://magento.softwaretestingboard.com/");
    });

    afterEach(async function(){
        await driver.quit()

    });

    
    it('Login realizado com sucesso', async function(){
        const botaoSign = await driver.findElement(By.className('authorization-link'))
        await botaoSign.click()
        
        const campoLogin = await driver.findElement(By.id("email"))
        const campoPassword = await driver.findElement(By.id("pass"))
        const botaoLogin = await driver.findElement(By.id("send2"))

        await campoLogin.sendKeys('diego.dtsa@gmail.com')
        await campoPassword.sendKeys('Pwd1010@@')
        await botaoLogin.click()
        await driver.sleep(5000)

        const title = await driver.findElement(By.className('logged-in')).getText()
        assert.equal('Welcome, Diego Teixeira!', title)

    });

    it('Login senha vazia', async function(){
        
        const botaoSign = await driver.findElement(By.className('authorization-link'))
        await botaoSign.click()
        
        const campoLogin = await driver.findElement(By.id("email"))
        const campoPassword = await driver.findElement(By.id("pass"))
        const botaoLogin = await driver.findElement(By.id("send2"))

        await campoLogin.sendKeys('diego.dtsa@gmail.com')
        await campoPassword.sendKeys('')
        await botaoLogin.click()
        await driver.sleep(5000)

        const title = await driver.findElement(By.id('pass-error')).getText()
        assert.equal('This is a required field.', title)

    });

    it('Email vazia', async function(){
        
        const botaoSign = await driver.findElement(By.className('authorization-link'))
        await botaoSign.click()
        
        const campoLogin = await driver.findElement(By.id("email"))
        const campoPassword = await driver.findElement(By.id("pass"))
        const botaoLogin = await driver.findElement(By.id("send2"))

        await campoLogin.sendKeys('')
        await campoPassword.sendKeys('Pwd1010@@')
        await botaoLogin.click()
        await driver.sleep(5000)

        const title = await driver.findElement(By.id('email-error')).getText()
        assert.equal('This is a required field.', title)

    });
    
});

describe('Realiza Compras', async function(){

    let driver;

    beforeEach(async function(){
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://magento.softwaretestingboard.com/");
    });

    afterEach(async function(){
        await driver.quit()

    });

    it('Escolher Produto', async function(){
        const escolherItem = await driver.findElement(By.className('product-image-wrapper'))
        await escolherItem.click()

        const escolherTamanho = await driver.findElement(By.id('option-label-size-143-item-166'))
        await escolherTamanho.click()

        const escolherCor = await driver.findElement(By.className('swatch-option color'))
        await escolherCor.click()

        const escolherQuantidade = await driver.findElement(By.className('input-text qty'))
        await escolherQuantidade.sendKeys('10')

        const adicionarCarrinho = await driver.findElement(By.className('action primary tocart'))
        await adicionarCarrinho.click()

        const title = await driver.findElement(By.className('message-success success message')).getText()
        assert.equal('You added Radiant Tee to your ', title)



    });


});