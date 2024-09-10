from . import LLMFrontEnd
import json

class Instruction:
    def __init__(self):
        self.next = None
        self.prev = None
        self.module = None
        self.operands = []

    def get_module(self):
        return self.module

    def get_num_operands(self):
        return len(self.operands)
    
    def get_operand(self, index):
        return self.operands[index]
    
    def set_operand(self, index, operand):
        self.operands[index] = operand

    def __str__(self, indent=0) -> str:
        return "Instruction"

class Rule(Instruction):
    def __init__(self, rule_str):
        super().__init__()
        self.operands = [None] * 1
        self.set_rule(rule_str)

    @classmethod
    def from_string(cls, rule_str, num_rules=0):
        # try parsing as json
        try:
            json_data = json.loads(rule_str)
            if isinstance(json_data, list):
                messages = json_data
            else:
                messages = json_data.get("messages", [])
            messages_filtered = [message for message in messages if message.get("role") == "system" or message.get("role") == "user"]
            rule_str = "\n".join([message.get("content") for message in messages_filtered])
        except json.JSONDecodeError:
            pass # plain text
        rules = LLMFrontEnd().generate_rules_global(rule_str, num_rules)
        if rules == "" or rules is None:
            return []
        parts = rules.split('\n')
        return [cls(part.strip()) for part in parts if part]

    def get_rule(self):
        return self.get_operand(0)

    def set_rule(self, rule_str):
        self.set_operand(0, rule_str)

    def __str__(self, indent=0):
        return " " * indent + f"Rule: {self.get_rule()}"

# Not used
class IfThen(Instruction):
    def __init__(self, condition, then_instruction):
        super().__init__()
        self.operands = [None] * 2
        self.set_condition(condition)
        self.set_then_instruction(then_instruction)

    def get_condition(self):
        return self.get_operand(0)
    
    def get_then_instruction(self):
        return self.get_operand(1)
    
    def set_condition(self, condition):
        self.set_operand(0, condition)

    def set_then_instruction(self, then_instruction):
        self.set_operand(1, then_instruction)

    def __str__(self, indent=0):
        then_str = self.get_then_instruction().__str__(indent + 2) if self.get_then_instruction() else " " * (indent + 2) + "None"
        return " " * indent + f"IfThen: {self.get_condition()}\n{then_str}"