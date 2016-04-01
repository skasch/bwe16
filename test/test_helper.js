import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import chaiAsPromised from 'chai-as-promised'

chaiAsPromised.transformAsserterArgs = function(args) {
    return Promise.all(args)
}

chai.use(chaiImmutable)
chai.use(chaiAsPromised)