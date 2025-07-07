#[starknet::contract]
mod MyNFT {
    use openzeppelin_introspection::src5::SRC5Component;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use openzeppelin_token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use starknet::get_caller_address;
    use starknet::contract_address::ContractAddress;
   // use starknet::contract_address::ContractAddress;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC721 Mixin
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        token_id:u256
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        recipient:ContractAddress,
        base_uri: ByteArray,
        name: ByteArray,
        symbol: ByteArray
    ) {
        let token_id = 0_u256;
        self.token_id.write(token_id);
        self.erc721.initializer(name, symbol, base_uri);
        self.erc721.mint(recipient, token_id);

    }

    #[external(v0)]
    fn mint(
        ref self: ContractState,
    ) {
        let recipient=get_caller_address();
        let id=self.token_id.read() + 1;
        self.erc721.mint(recipient, id);
        self.token_id.write(id);
    }
}