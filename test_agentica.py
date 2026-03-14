import asyncio
from agentica import spawn

async def test():
    agent = await spawn(premise="You are a helpful assistant.", model="anthropic/claude-sonnet-4")
    print("Agent methods:", [m for m in dir(agent) if not m.startswith('_')])

asyncio.run(test())
