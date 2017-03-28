# Spies, stubs and mocks

## What a difference between spies, stubs and mocks (briefly)

### Spies

`Spies` watch your functions and report back on how they are called.

**Use `spies` if you simply want to watch and verify somethings happens in your test case.**

The definition from Sinon docs:

> A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls.

```js
{
    setUp: function () {
        sinon.spy(jQuery, "ajax");
    },

    tearDown: function () {
        jQuery.ajax.restore(); // Unwraps the spy
    },

    "test should inspect jQuery.getJSON's usage of jQuery.ajax": function () {
        jQuery.getJSON("/some/resource");

        assert(jQuery.ajax.calledOnce);
        assertEquals("/some/resource", jQuery.ajax.getCall(0).args[0].url);
        assertEquals("json", jQuery.ajax.getCall(0).args[0].dataType);
    }
}
```

### Stubs

With a stub, you will actually change how functions are called in your test.

**Use `stubs` if you simply want to specify how something will work to help your test case.**

The definition from Sinon docs:

> Test stubs are functions (spies) with pre-programmed behavior.

```js
"test should stub method differently based on arguments": function () {
    var callback = sinon.stub();
    callback.withArgs(42).returns(1);
    callback.withArgs(1).throws("TypeError");

    callback(); // No return value, no exception
    callback(42); // Returns 1
    callback(1); // Throws TypeError
}
```

### Mocks

Mocks take the attributes of spies and stubs, smashes them together and changes the style a bit. A mock will both observe the calling of functions and verify that they were called in some specific way.

**Use `mocks` if you want to both of spies and stubs on a single dependency in your test case.**

The definition from Sinon docs:

> Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations.

```js
"test should call all subscribers when exceptions": function () {
    var myAPI = { method: function () {} };

    var spy = sinon.spy();
    var mock = sinon.mock(myAPI);
    mock.expects("method").once().throws();

    PubSub.subscribe("message", myAPI.method);
    PubSub.subscribe("message", spy);
    PubSub.publishSync("message", undefined);

    mock.verify();
    assert(spy.calledOnce);
}
```

## Links

 * [Sinon Spies vs. Stubs](https://jaketrent.com/post/sinon-spies-vs-stubs/)
 * [Sinon.js](http://sinonjs.org/)
