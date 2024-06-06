interface Prompt {
    propose: string;
    expectation: string;
}

interface Agent {
    ID: number;
    Name: string;
    Description: string;
    ImageURL: string;
    Prompt: Prompt;
    UserID: string;
    FrameworkID: number;
    RoleFrameID: number;
}

export default interface Agents{
    agents: Agent
}