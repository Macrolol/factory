import { OPENAI_API_KEY } from '$env/static/private';
import type { BaseChatModel } from "langchain/chat_models"
import type { AIMessage, HumanMessage, SystemMessage } from "langchain/schema"
import { ChatOpenAI } from "langchain/chat_models/openai";

interface ChatModel{}