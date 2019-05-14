import http from 'http';
import { useStore, events } from 'cauldron';
import { generateChallenge, validateChallenge } from './challenge';

const validatedIps = useStore('captcha', Object.create(null));
