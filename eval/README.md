# Eval setup

## Running the eval
`eval.py` is the driver script, inside eval dir do the following:
```sh
python eval.py -i dataset/sammo-pos-prompt.md -o result/ -m gpt-4-turbo,gpt-35-turbo,gpt-4o-mini,mistral,llama3.1,gemma2,phi3:medium,gemma2:27b -t 100 -n 2
```
For each file in dataset, the results are generated in dir result.

To use remote models only,

```sh
python eval.py -i dataset/sammo-pos-prompt.md -o result/ -m gpt-4-turbo,gpt-35-turbo,gpt-4o-mini -t 100 -n 2
```

-n number of test sets for a prompt, ideally 2 or 3   
-t number of times to run the test, a bigger number 


## Understanding the result
There will be md files with tables for each result-dir/prompt-dir/ 
