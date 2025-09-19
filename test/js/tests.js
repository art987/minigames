(function(){
    var registry = [];
    function register(meta){
        registry.push(meta);
    }
    function list(){ return registry.slice(); }
    window.TestRegistry = { register: register, list: list };
})();



