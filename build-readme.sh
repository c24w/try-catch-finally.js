MIN_SIZE=$(du --apparent-size -h "$(MINIFIED=y ./main-path.js)" | cut -f 1)

DIGITS_PATTERN='^[0-9]+$'
if [[ "$MIN_SIZE" =~ $DIGITS_PATTERN ]]; then
  echo hello
  # Size is bytes so is missing units
  MIN_SIZE="$MIN_SIZE byte"
fi

# Replace <!--abc--><!--abc--> with <!--abc-->xyz<!--abc-->
function template {
  NAME=$1; VALUE=$2
  echo "Templating '$NAME' as '$VALUE'"
  sed -i "s/\(<!--$NAME-->\).*\?\(<!--$NAME-->\)/\1$VALUE\2/" readme.md
}

template 'size' "$MIN_SIZE"

doctoc --maxlevel 3 --title '## Contents' readme.md
