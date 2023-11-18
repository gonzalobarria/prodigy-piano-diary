// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProdigyPianoDiary {
    enum StudyType {
        Fingers,
        Rhythm,
        Memorization,
        Dynamics
    }

    enum FocusType {
        Study,
        Practice
    }

    struct Composer {
        string name;
        string birthdate;
    }

    struct Sheet {
        string name;
        uint createdAt;
        uint8 difficulty;
        string dataUri;
    }

    struct User {
        address id;
        string name;
        uint8 level;
    }

    struct Record {
        uint256 phraseNum;
        uint256 subPhraseNum;
        uint8 qtyMinutes;
        StudyType studyType;
        FocusType focusType;
        bool isAllSheet;
        uint256 createdAt;
    }

    Composer[] composers;
    Sheet[] sheets;
    User[] users;
    Record[] records;

    // Sheets that belongs to a Composer --> composerIdx => sheetsIdx[]
    mapping(uint256 => uint256[]) composerSheets;

    // User is studying N sheets --> userIdx => sheetsIdx[]
    mapping(uint256 => uint256[]) userSheets;

    // User is registering the study of the sheet in a record --> userIdx => sheetsIdx => recordIdx[]
    mapping(uint256 => mapping(uint256 => uint256[])) registerUserStudy;

    /**
     * Composer
     */
    function addComposer(string memory _name, string memory _birthdate) public {
        composers.push(Composer({name: _name, birthdate: _birthdate}));
    }

    function getComposer(
        uint _composerIndex
    ) public view returns (Composer memory) {
        require(_composerIndex < composers.length, "Composer not found");

        return composers[_composerIndex];
    }

    function getComposers() public view returns (Composer[] memory) {
        return composers;
    }

    function getComposerSheets(
        uint _composerIndex
    ) public view returns (Sheet[] memory) {
        require(_composerIndex < composers.length, "Composer not found");

        // return composerSheets[_composerIndex];
        uint256[] memory composerSheetsIdx = composerSheets[_composerIndex];
        Sheet[] memory composerSheetsTmp = new Sheet[](composerSheetsIdx.length);

        for (uint j = 0; j < composerSheetsIdx.length; j++) {
            composerSheetsTmp[j] = sheets[composerSheetsIdx[j]];
        }
        return composerSheetsTmp;
    }

    /**
     * Sheets
     */

    function addSheet(
        string memory _name,
        uint256 _composerIdx,
        uint256 _userIdx,
        uint8 _level,
        string memory _dataUri
    ) public {
        require(_userIdx < users.length, "User not found");
        require(_composerIdx < composers.length, "Composer not found");

        sheets.push(
            Sheet({name: _name, createdAt: block.timestamp, difficulty: _level, dataUri: _dataUri})
        );

        composerSheets[_composerIdx].push(sheets.length - 1);
        userSheets[_userIdx].push(sheets.length - 1);
    }

    function getSheet(uint _sheetIndex) public view returns (Sheet memory) {
        require(_sheetIndex < sheets.length, "Sheet not found");

        return sheets[_sheetIndex];
    }

    function getSheets() public view returns (Sheet[] memory) {
        return sheets;
    }

    function getUserSheets(
        uint _userIdx
    ) public view returns (Sheet[] memory) {
        require(_userIdx < users.length, "User not found");

        uint256[] memory userSheetsIdx = userSheets[_userIdx];
        Sheet[] memory userSheetsTmp = new Sheet[](userSheetsIdx.length);

        for (uint j = 0; j < userSheetsIdx.length; j++) {
            userSheetsTmp[j] = sheets[userSheetsIdx[j]];
        }
        return userSheetsTmp;
    }

    function getUserIdx() public view returns (uint256) {
        uint256 userIdx = 0;

        for (uint i = 0; i < users.length; i++) {
            if (users[i].id == msg.sender) {
                userIdx = i;
                break;
            }
        }

        return userIdx;
    }

    function getMySheets() public view returns (uint256[] memory) {
        require(getUserIdx() > 0, "User not found");

        return userSheets[getUserIdx()];
    }

    function addUser(string memory _name, uint8 _level) public {
        require(getUserIdx() == 0, "User already exists");

        users.push(User({id: msg.sender, name: _name, level: _level}));
    }

    function getUser(uint _userIdx) public view returns (User memory) {
        require(_userIdx < users.length, "User not found");

        return users[_userIdx];
    }

    function getUsers() public view returns (User[] memory) {
        return users;
    }

    /**
     * Register Record
     */

    function addRecord(
        uint256 _userIdx,
        uint256 _sheetIdx,
        uint256 _phraseNum,
        uint256 _subPhraseNum,
        uint8 _qtyMinutes,
        StudyType _studyType,
        FocusType _focusType,
        bool _isWholeSheet
    ) public {
        records.push(
            Record({
                phraseNum: _phraseNum,
                subPhraseNum: _subPhraseNum,
                qtyMinutes: _qtyMinutes,
                studyType: _studyType,
                focusType: _focusType,
                isAllSheet: _isWholeSheet,
                createdAt: block.timestamp
            })
        );

        registerUserStudy[_userIdx][_sheetIdx].push(records.length - 1);
    }

    function getRecordsBySheet(
        uint _userIdx,
        uint256 _sheetIdx
    ) public view returns (Record[] memory) {
        require(_userIdx < users.length, "User not found");
        require(_sheetIdx < sheets.length, "Sheet not found");

        uint256[] memory recordsIdx = registerUserStudy[_userIdx][_sheetIdx];
        Record[] memory recordsTmp = new Record[](recordsIdx.length);

        for (uint j = 0; j < recordsIdx.length; j++) {
            recordsTmp[j] = records[recordsIdx[j]];
        }
        return recordsTmp;
    }

    function getRecord(uint256 _recordIdx) public view returns (Record memory) {
        return records[_recordIdx];
    }
}
