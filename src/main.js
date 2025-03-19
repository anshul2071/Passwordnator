import { passwordGenerator } from "./components/passwordGenerator";
import { strengthChecker } from "./components/strengthChecker";
import {uiController} from "./components/uiController";




    const passwordGenerate = passwordGenerator();
    const passwordStrength = strengthChecker();
    const handleUI = uiController(passwordGenerate, passwordStrength)

    handleUI.initializeUI();
